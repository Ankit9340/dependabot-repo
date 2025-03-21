import { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux';
import { GENRATE_NEW_API, GET_API_LIST } from '../../../Redux/actions/apiDoc'
import { Dialog, Transition } from '@headlessui/react'

export default function GenrateAPI() {
    let dispatch = useDispatch()
    const [modalShow, setModalShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [apiTitle, setApiTitle] = useState('');

    function closeModal() {
        setModalShow(false)
    }

    function openModal() {
        setModalShow(true)
    }

    const handleGenrateApi = async () => {
        setLoading(true)
        let res = await dispatch(GENRATE_NEW_API({ apiTitle }));
        if (res?.success) {
            dispatch(GET_API_LIST())
            setModalShow(false)
            setLoading(false)
            setApiTitle('')
        } else {
            setLoading(false)
        }
    }

    return (
        <>
            <button
                type="button"
                onClick={openModal}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
                Genrate API
            </button>
            <Transition appear show={modalShow} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Genrate New API
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            API title
                                        </p>
                                        <input type="text" className="border p-1 mt-2 rounded-md w-full focus:outline-none" placeholder="title.." value={apiTitle}
                                            onChange={
                                                (e) => {
                                                    setApiTitle(e.target.value)
                                                }
                                            } />
                                    </div>

                                    <div className="mt-4 flex justify-end">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-lg border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white "
                                            onClick={handleGenrateApi}
                                        >
                                            {loading ? 'Process..' : 'Genrate'}
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
