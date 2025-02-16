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
        <h1 className="text-2xl font-bold">
          Wir benötigen Ihre Einwilligung, um fortzufahren.
        </h1>
        <p className="text-sm">
          Um unsere Webseite für Sie optimal gestalten und verbessem zu können,
          venvenden Wir Cookies.
        </p>
        <p className="text-sm">
          Weitere Informationen zu Cookies erhalten Sie in unserer
          <a
            className="text-blue-500 inline-block ml-2"
            href={data?.assistant_general?.privacy_policy_url}
          >
            Datenschutzerklärung
          </a>
        </p>
        <div className="grid gap-4 py-4">
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
        </div>

        <div className="flex items-center gap-4 justify-center">
          <Button
            variant="secondary"
            onClick={() => {
              setChecked1(true);
              setChecked2(true);
            }}
          >
            Alle Akzeptieren
          </Button>
          <Button
            variant="primary"
            disabled={!checked1 || !checked2}
            onClick={() => {
              setPage("chat");
              setShowAcceptTermsCount(1);
              setShowModal(false);
              setHasAcceptedTerms(true);
            }}
          >
            Akzeptieren
          </Button>
        </div>
      </div>
    </div>
  );
}
