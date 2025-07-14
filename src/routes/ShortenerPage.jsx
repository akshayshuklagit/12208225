import React, { useState } from "react";
import ShortenerForm from "../components/ShortenerForm";

const ShortenerPage = () => {
  const [refresh, setRefresh] = useState(false);
  return <ShortenerForm onShorten={() => setRefresh(!refresh)} />;
};

export default ShortenerPage;
