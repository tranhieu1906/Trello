import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link } from 'react-router-dom'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Dropdown({ icon, name }) {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="mega-menu-full-dropdown flex items-center justify-between w-full py-3 pl-3 pr-4 font-medium text-white rounded md:w-auto hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">
                    <span className="mt-1">{name}</span>
                    {icon && <ChevronDownIcon className="-mr-1 mt-1 ml-2 h-5 w-5" aria-hidden="true" />}

                </Menu.Button>
            </div>
            {
                icon ? (
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute left-0 z-10 mt-2 w-80 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            to="#"
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            abc
                                        </Link>
                                    )}
                                </Menu.Item>
                            </div>
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            to="#"
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            Archive
                                        </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            to="#"
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            Move
                                        </Link>
                                    )}
                                </Menu.Item>
                            </div>

                        </Menu.Items>
                    </Transition>
                ) :
                    (
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute left-0 z-10 mt-2 w-80 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <div>
                                                <Link
                                                    to="#"
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900 font-bold text-sm' : 'text-gray-700 font-bold text-sm',
                                                        'block px-4 py-2 font-bold text-base'
                                                    )}
                                                >
                                                    Create board
                                                    <p className='mt-2 font-normal text-sm' >A board is made up of cards ordered on lists. Use it to manage projects, track information, or organize anything.</p>
                                                </Link>
                                                
                                            </div>

                                        )}
                                    </Menu.Item>
                                </div>

                            </Menu.Items>
                        </Transition>

                    )
            }

        </Menu>
    )
}
