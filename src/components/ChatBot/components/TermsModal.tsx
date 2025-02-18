import React from "react";
import useChatSettings from "../../../context/useChatSettings";
import { cn } from "../../../lib/utils";
import Button from "../../Button/index";

export default function TermsModal() {
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const {
    data,
    setShowAcceptTermsCount,
    showAcceptTermsCount,
    setPage,
    shoWModal,
    setShowModal,
    setHasAcceptedTerms,
  } = useChatSettings();

  return (
    <div
      className={cn(
        "absolute inset-0 z-[9999999999] pointer-events-none grid items-end justify-center justify-items-center  bg-gray-700/50 transition-all duration-500 ease-in-out opacity-0",
        {
          "opacity-100 pointer-events-auto": shoWModal,
        }
      )}
      onClick={() => {
        setShowAcceptTermsCount(2);
        setShowModal(false);
      }}
    >
      <div
        className={cn(
          "p-4 bg-white rounded-lg shadow-lg w-[calc(100%-2rem)] max-w-[40rem] overflow-hidden mb-4 grid gap-4 transition-all duration-500 ease-in-out opacity-0 translate-y-[20%]",
          {
            "translate-y-0 opacity-100": showAcceptTermsCount,
          }
        )}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        <button
          className="absolute top-2 right-2"
          onClick={() => {
            setShowAcceptTermsCount(2);
            setShowModal(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10ZM9.17 14.83l5.66-5.66M14.83 14.83 9.17 9.17"
              stroke="#000000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </button>

        <h1 className="text-2xl font-bold">
          Wir benötigen Ihre Einwilligung, um fortzufahren.
        </h1>
        <p className="text-sm">
          Um den Chat für Sie optimal gestalten und verbessern zu können,
          benötigen wir Ihre Zustimmung zur Verarbeitung der Daten.
        </p>
        <p className="text-sm">
          Weitere Informationen dazu erhalten Sie in unserer{" "}
          <a
            className="text-blue-500 inline-block"
            href={"https://www.immoai-bot.com/dpa"}
          >
            Datenschutzerklärung
          </a>
        </p>
        {/*     <div className="grid gap-4 py-4">
          <div className="grid grid-cols-[auto,1fr] gap-4">
            <input
              type="checkbox"
              id="checkbox1"
              name="checkbox1"
              value="value1"
              className="w-5 h-5"
              onChange={() => setChecked1(!checked1)}
              checked={checked1}
            />
            <label htmlFor="checkbox1" className="text-sm">
              Technisch notwendige Cookies
            </label>
          </div>
          <div className="grid grid-cols-[auto,1fr] gap-4">
            <input
              type="checkbox"
              id="checkbox2"
              name="checkbox2"
              value="value2"
              className="w-5 h-5"
              onChange={() => setChecked2(!checked2)}
              checked={checked2}
            />

            <label htmlFor="checkbox2" className="text-sm">
              Drittanbieter-Cookies (Social-Media-Elemente von Facebook, Twitter
              und Google werden auf der gesamten Webseite aktiviert.)
            </label>
          </div>
        </div> */}

        <div className="flex items-center gap-4 justify-center">
          {/*         <Button
            variant="secondary"
            onClick={() => {
              setChecked1(true);
              setChecked2(true);
            }}
          >
            Alle Akzeptieren
          </Button> */}
          <Button
            variant="primary"
            onClick={() => {
              setPage("chat");
              setShowAcceptTermsCount(1);
              setShowModal(false);
              setHasAcceptedTerms(true);
            }}
            className="w-full bg-[#b4ec4c] text-black hover:bg-[#b1e255] hover:text-black hover:border-[#aec584]"
          >
            Akzeptieren
          </Button>
        </div>
      </div>
    </div>
  );
}
