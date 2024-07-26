import { useState } from "react";
import { FaArrowRight, FaRegHandPointer } from "react-icons/fa";
import { MdOutlineContentCopy } from "react-icons/md";
import { toast } from "react-toastify";
import useSaveToClipBoard from "./hooks/useSaveToClipboard";

// const origin = "http://localhost:5000/api/v1";

const Landing = () => {
  const [inputData, setInputData] = useState({ shortUrl: "" });
  const [responseData, setResponseData] = useState({});

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputData?.shortUrl) {
      return;
    }
    try {
      const data = await fetch(`/api/v1/url/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ origUrl: inputData.shortUrl }),
      });
      const response = await data.json();
      setResponseData(response);
      setInputData({ shortUrl: "" });
      toast.success("Link Generated");
    } catch (error) {
      toast.success("Link Generated");
    }
  };

  const handleCopy = (value) => {
    useSaveToClipBoard(value)
      .then((res) => {
        if (!res) {
          toast.error("Unable to copy");
          return;
        }
        toast.success("Copied successfully");
      })
      .catch((err) => {
        toast.error("Unable to copy");
      });
  };

  return (
    <main className="h-screen w-screen grid place-items-center">
      <section className="w-[90vw] max-w-[600px] bg-grey-100 py-8 px-8 md:px-10 rounded shadow-sm hover:shadow-xl transition-all">
        <h1 className="mb-8 mt-2 text-4xl normal-case font-bold text-primary-500 text-center">
          shorti
        </h1>
        <form className="">
          <label
            htmlFor="url"
            className="mb-6 grid grid-cols-[1fr_auto] hover:shadow-sm transition-all"
          >
            <input
              type="text"
              name="shortUrl"
              id="url"
              value={inputData.shortUrl}
              onChange={handleChange}
              placeholder="enter the link to be shortened"
              className="mr-4 text-base h-full rounded-l-lg w-full px-4 py-3 bg-transparent outline-none placeholder:capitalize placeholder:tracking-tight  placeholder:text-grey-400"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-4 md:px-6 btn rounded-r-lg cursor-pointer"
            >
              <FaArrowRight />
            </button>
          </label>
        </form>
        {Object.keys(responseData).length === 0 || (
          <div className="flex flex-col gap-3  justify-items-center items-start mt-8">
            <h4 className="font-bold text-xl w-full md:text-2xl ">
              URL:
              <a
                target="_blank"
                href={responseData?.shortUrl}
                className=" ml-2 text-lg md:text-xl tracking-tight font-normal normal-case hover:text-primary-500 transition-all break-words"
              >
                {responseData?.shortUrl}
              </a>
              <button
                type="button"
                onClick={() => handleCopy(responseData?.shortUrl)}
                className="align-middle text-lg md:text-xl p-0 ml-2 text-grey-500 hover:text-primary-500 transition-all"
              >
                <MdOutlineContentCopy />
              </button>
            </h4>
            <p className=" flex gap-1 font-semibold bg-primary-500 text-white p-2 rounded-lg hover:bg-primary-700 transition-all">
              Clicks
              <FaRegHandPointer />:<span>{responseData?.clicks}</span>
            </p>
          </div>
        )}
      </section>
    </main>
  );
};
export default Landing;
