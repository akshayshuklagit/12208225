export async function logEvent(stack, level, logPackage, message, token) {
  const response = await fetch("http://20.244.56.144/evaluation-service/logs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJha3NoYXlzaHVrbGFhZGkyMDAyQGdtYWlsLmNvbSIsImV4cCI6MTc1MjQ3MTkwOCwiaWF0IjoxNzUyNDcxMDA4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZTE1ZDk0ZWYtNTk0NC00ZDI3LWFmYzctMGI4MWQ3NjQzMDFlIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYWtzaGF5IHNodWtsYSIsInN1YiI6IjY1MTI0N2E1LWEzMmItNDVhMS1hYmU3LWU0NmU0NDMxYjc4ZSJ9LCJlbWFpbCI6ImFrc2hheXNodWtsYWFkaTIwMDJAZ21haWwuY29tIiwibmFtZSI6ImFrc2hheSBzaHVrbGEiLCJyb2xsTm8iOiIxMjIwODIyNSIsImFjY2Vzc0NvZGUiOiJDWnlwUUsiLCJjbGllbnRJRCI6IjY1MTI0N2E1LWEzMmItNDVhMS1hYmU3LWU0NmU0NDMxYjc4ZSIsImNsaWVudFNlY3JldCI6IlRRWkpNVGViS1FQV2JTYWIifQ.qCyfoVpGGFeWklLsOvcKBAlHBUyqG8tdjMzywZO1OLM",
    },
    body: JSON.stringify({ stack, level, package: logPackage, message }),
  });

  const data = await response.json();
  console.log("Log Response:", data);
  return data;
}
