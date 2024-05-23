import { FC, useEffect, useRef, useState } from "react";
import AlertModal from "../common/AlertModal";

const ContactForm: FC = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const timerId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (showAlert) {
      timerId.current = setTimeout(() => {
        setShowAlert(false);
      }, 4000);
    }

    return () => {
      clearTimeout(timerId.current!);
    };
  }, [showAlert]);

  return (
    <section className="py-10 bg-gray-100 dark:bg-zinc-900 font-freeman">
      <div className="flex justify-center">
        <div className="flex flex-col gap-16 w-full md:w-3/4 lg:w-2/3">
          <div className="border-b-2 border-gray-700 dark:border-gray-300 w-fit">
            <h2 className="text-left text-4xl leading-6 text-gray-700 dark:text-gray-300 mb-3">
              Send me a message
            </h2>
          </div>
          <div className="space-y-6">
            <div className="flex flex-wrap -mx-2 space-y-4 md:space-y-0">
              <div className="w-full md:w-1/2 px-2">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full h-14 px-4 border-b-2 border-gray-300 bg-transparent text-base focus:outline-none"
                />
              </div>
              <div className="w-full md:w-1/2 px-2">
                <input
                  type="email"
                  placeholder="E-mail"
                  className="w-full h-14 px-4 border-b-2 border-gray-300 bg-transparent text-base focus:outline-none"
                />
              </div>
            </div>
            <div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full h-14 px-4 border-b-2 border-gray-300 bg-transparent text-base focus:outline-none"
              />
            </div>
            <div>
              <textarea
                placeholder="Message"
                className="w-full h-52 px-4 border-b-2 border-gray-300 bg-transparent text-base focus:outline-none resize-none"
              ></textarea>
            </div>
            <div className="relative flex justify-end">
              {showAlert ? (
                <div className="absolute bottom-[100%] mb-3">
                  <AlertModal
                    status="fail"
                    text="Sorry, service is currently unavailable"
                    secondaryText="Reach Mayowa on any of his socials"
                  />
                </div>
              ) : null}
              <button
                onClick={() => setShowAlert(true)}
                type="submit"
                className=" py-3 px-6 rounded-lg hover:scale-95 transition duration-300 text-gray-700 dark:text-gray-300 border-2 border-gray-700 dark:border-gray-300"
              >
                Send message
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
