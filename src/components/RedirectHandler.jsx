import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { logEvent } from "../Logger/logEvent";

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJha3NoYXlzaHVrbGFhZGkyMDAyQGdtYWlsLmNvbSIsImV4cCI6MTc1MjQ3MTkwOCwiaWF0IjoxNzUyNDcxMDA4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZTE1ZDk0ZWYtNTk0NC00ZDI3LWFmYzctMGI4MWQ3NjQzMDFlIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYWtzaGF5IHNodWtsYSIsInN1YiI6IjY1MTI0N2E1LWEzMmItNDVhMS1hYmU3LWU0NmU0NDMxYjc4ZSJ9LCJlbWFpbCI6ImFrc2hheXNodWtsYWFkaTIwMDJAZ21haWwuY29tIiwibmFtZSI6ImFrc2hheSBzaHVrbGEiLCJyb2xsTm8iOiIxMjIwODIyNSIsImFjY2Vzc0NvZGUiOiJDWnlwUUsiLCJjbGllbnRJRCI6IjY1MTI0N2E1LWEzMmItNDVhMS1hYmU3LWU0NmU0NDMxYjc4ZSIsImNsaWVudFNlY3JldCI6IlRRWkpNVGViS1FQV2JTYWIifQ.qCyfoVpGGFeWklLsOvcKBAlHBUyqG8tdjMzywZO1OLM";

const RedirectHandler = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const urls = JSON.parse(localStorage.getItem("shortURLs") || "[]");
    const found = urls.find((u) => u.shortcode === shortcode);

    if (!found) {
      logEvent(
        "frontend",
        "error",
        "redirect",
        `Shortcode ${shortcode} not found`,
        accessToken
      );
      alert("Invalid URL");
      navigate("/");
      return;
    }

    const expired = Date.now() > found.createdAt + found.expiresIn * 60 * 1000;

    if (expired) {
      logEvent(
        "frontend",
        "warn",
        "redirect",
        `Expired shortcode ${shortcode}`,
        accessToken
      );
      alert("This short link has expired.");
      navigate("/");
      return;
    }

    found.clicks += 1;
    localStorage.setItem("shortURLs", JSON.stringify(urls));
    logEvent(
      "frontend",
      "info",
      "redirect",
      `Redirecting to ${found.original}`,
      accessToken
    );
    window.location.href = found.original;
  }, [shortcode, navigate]);

  return null;
};

export default RedirectHandler;
