import headerIcon from "../assets/headericon.png"

export default function Navbar() {
    return (
        <nav className="flex fixed w-full justify-between py-3 px-8 backdrop-blur-lg bg-neutral-100/60 dark:bg-zinc-900/60 transition duration-200" id="navbar">
            <div id="left" className="flex gap-3 items-center py-1">
            <img src={headerIcon} className="rounded-full w-8 h-8 lg:hover:shadow-lg lg:hover:scale-110 active:scale-90 shadow cursor-pointer transition duration-200" alt="" id="home-button" />
                <div id="navbar-title-split" className="px-[1px] py-3.5 bg-neutral-300 dark:bg-neutral-600 rotate-12"></div>
                <h1 className="font-bold text-2xl dark:text-neutral-100 select-none transition duration-200">Account</h1>
            </div>
                <div id="right" className="flex flex-row-reverse gap-3 items-center py-1 justify-center">
                <div className="rounded-full account-profile-img shadow w-8 h-8 lg:hover:shadow-lg lg:hover:scale-110 active:scale-90 cursor-pointer transition duration-200" aria-label="Profile Button" id="home-button" />
            </div>
        </nav>
    )
}
