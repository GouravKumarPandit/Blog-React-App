import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
    return (
        <section className="relative overflow-hidden py-5 bg-teal-700 border border-t-2 border-t-black">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-6 flex flex-wrap">
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">
                            <div className="inline-flex items-center">
                                <Logo width="100px" />
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <ul>
                                <li className="">
                                    <Link
                                        className="text-base font-medium text-white hover:underline"
                                        to="/"
                                    >
                                        Features
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <ul>
                                <li className="">
                                    <Link
                                        className="text-base font-medium text-white hover:underline"
                                        to="/"
                                    >
                                        Account
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                        <div className="h-full">
                            <ul>
                                <li className="">
                                    <Link
                                        className="text-base font-medium text-white hover:underline"
                                        to="/"
                                    >
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full pb-5">
                        <div className="h-full">
                            <div>
                                <p className="text-sm text-white text-center">
                                    &copy; Copyright 2024. All Rights Reserved by GouravKumarPandit.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer