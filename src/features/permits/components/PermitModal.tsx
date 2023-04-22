import {
  Fragment,
  useRef,
  useEffect,
  useState,
  type FC,
  type Dispatch,
  type SetStateAction,
} from "react";
import { usePermits } from "../hooks/usePermits";
import { Dialog, Transition } from "@headlessui/react";
import { parseISO, format } from "date-fns";

interface PermitModalProps {
  id: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const PermitModal: FC<PermitModalProps> = ({ id, open, setOpen }) => {
  const cancelButtonRef = useRef(null);
  const permits = usePermits();
  const [statusDate, setStatusDate] = useState("");

  const permit = permits.filter((permit) => permit.permitNumber === id)[0];

  useEffect(() => {
    if (permit) {
      const statusDateObj = parseISO(permit?.statusDate || "");
      setStatusDate(format(statusDateObj, "MMM d, yyyy"));
    }
  }, [permit]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => setOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="flex items-start">
                    <div className="mt-3 sm:ml-4 sm:mt-0 text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Permit Details - {permit?.permitNumber}
                      </Dialog.Title>
                      <table className="mt-4 table-auto text-sm">
                        <tbody>
                          <tr>
                            <td>Address</td>
                            <td className="pl-4 py-1 text-gray-600">{permit?.address}</td>
                          </tr>
                          <tr>
                            <td>Description</td>
                            <td className="pl-4 py-1 text-gray-600">{permit?.description}</td>
                          </tr>
                          <tr>
                            <td>Updated</td>
                            <td className="pl-4 py-1 text-gray-600">{statusDate}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                    onClick={() => setOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default PermitModal;
