import React, { useState } from 'react';

const LeftSideNav = () => {
    const [menuOpened, toggleMenu] = useState(false);
    return <header id="navbar" className={`navbar ${menuOpened ? 'open' : ''}`}>
        <div className="btn-arrow hide-xs-only" style={{zIndex: 2}} role="button" onClick={(e) => {toggleMenu(!menuOpened)}}>
            <span className="closed"></span>
        </div>
        <div className="navbar--grid-items">
            <div className="logo-tailfin">
                <img src="/assets/images/shannun-tailfin.svg" className="thumbnail" alt="Shannun Tailfin" title="Shannun Tailfin" />
            </div>
            <div className="logo-shannun">
                <img src="/assets/images/shannun-logo-white.svg" className="thumbnail" alt="Shannun Logo" title="Shannun Logo" />
            </div>
        </div>
        <div className="navbar--grid-items">
            <nav className="primary-navigation" role="navigation">
                <ul className="navigation-item-group">
                    <li className="nav-items">
                        <a href="#" className="menu-item" aria-label="">
                            <span className="icon-menu">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <g clipPath="url(#clip0_2607_41406)">
                                        <path d="M22 16V14L13.5 9V3.5C13.5 2.67 12.83 2 12 2C11.17 2 10.5 2.67 10.5 3.5V9L2 14V16L10.5 13.5V19L8 20.5V22L12 21L16 22V20.5L13.5 19V13.5L22 16Z" stroke="white" strokeOpacity="0.8" strokeWidth="1.6"></path>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_2607_41406">
                                            <rect width="24" height="24" fill="white"></rect>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </span>
                            <span className="menu-text">Book</span>
                        </a>
                        <ul className="secondary-navigation" role="navigation">
                            <li className="menu-item"><a href="#" className="menu-item">My booking</a></li>
                            <li className="menu-item"><a href="#" className="menu-item">Check-in options</a></li>
                            <li className="menu-item"><a href="#" className="menu-item">Bid to upgrade</a></li>
                            <li className="menu-item"><a href="#" className="menu-item">Offset your flight</a></li>
                        </ul>
                    </li>
                    <li className="nav-items">
                        <a href="#" className="menu-item" aria-label="">
                            <span className="icon-menu">
                                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.8 8.9L7.4 9.5L6.325 8.7C6.275 8.66667 6.14167 8.63333 5.925 8.6L5.8 8.65C5.65 8.68333 5.54167 8.77083 5.475 8.9125C5.40833 9.05417 5.41667 9.19167 5.5 9.325L6.65 11.325C6.71667 11.425 6.8 11.4958 6.9 11.5375C7 11.5792 7.10833 11.5833 7.225 11.55L15.75 9.3C16 9.23333 16.1875 9.07917 16.3125 8.8375C16.4375 8.59583 16.4667 8.35 16.4 8.1C16.3333 7.85 16.1875 7.6625 15.9625 7.5375C15.7375 7.4125 15.5 7.38333 15.25 7.45L12.8 8.1L9.075 4.6C8.99167 4.51667 8.89167 4.4625 8.775 4.4375C8.65833 4.4125 8.54167 4.41667 8.425 4.45L8.3 4.475C8.06667 4.525 7.90417 4.65833 7.8125 4.875C7.72083 5.09167 7.73333 5.3 7.85 5.5L9.8 8.9ZM2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V10.625C0 10.4417 0.0583333 10.2833 0.175 10.15C0.291667 10.0167 0.441667 9.93333 0.625 9.9C1.025 9.76667 1.35417 9.525 1.6125 9.175C1.87083 8.825 2 8.43333 2 8C2 7.56667 1.87083 7.175 1.6125 6.825C1.35417 6.475 1.025 6.23333 0.625 6.1C0.441667 6.06667 0.291667 5.98333 0.175 5.85C0.0583333 5.71667 0 5.55833 0 5.375V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H2ZM2 14H18V2H2V4.55C2.61667 4.91667 3.10417 5.40417 3.4625 6.0125C3.82083 6.62083 4 7.28333 4 8C4 8.71667 3.82083 9.37917 3.4625 9.9875C3.10417 10.5958 2.61667 11.0833 2 11.45V14Z" fill="white"></path>
                                </svg>
                            </span>
                            <span className="menu-text">Manage</span>
                        </a>
                        <ul className="secondary-navigation" role="navigation">
                            <li className="menu-item"><a href="#" className="menu-item">Review Booking</a></li>
                            <li className="menu-item"><a href="#" className="menu-item">Review Booking</a></li>
                            <li className="menu-item"><a href="#" className="menu-item">Review Booking</a></li>
                        </ul>
                    </li>
                    <li className="nav-items">
                        <a href="#" className="menu-item" aria-label="">
                            <span className="icon-menu">
                                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.80003 14H15.35L17.6 2H12.05L3.80003 14ZM0.550026 15.225L10.4 0.875C10.5834 0.591667 10.8209 0.375 11.1125 0.225C11.4042 0.075 11.7167 0 12.05 0H17.6C18.2334 0 18.7459 0.241667 19.1375 0.725C19.5292 1.20833 19.6667 1.75833 19.55 2.375L17.15 15.175C17.1 15.4083 16.9834 15.6042 16.8 15.7625C16.6167 15.9208 16.4084 16 16.175 16H0.950026C0.750026 16 0.604193 15.9125 0.512526 15.7375C0.42086 15.5625 0.43336 15.3917 0.550026 15.225ZM12.5 10C13.2 10 13.7917 9.75833 14.275 9.275C14.7584 8.79167 15 8.2 15 7.5C15 6.8 14.7584 6.20833 14.275 5.725C13.7917 5.24167 13.2 5 12.5 5C11.8 5 11.2084 5.24167 10.725 5.725C10.2417 6.20833 10 6.8 10 7.5C10 8.2 10.2417 8.79167 10.725 9.275C11.2084 9.75833 11.8 10 12.5 10Z" fill="white"></path>
                                </svg>
                            </span>
                            <span className="menu-text">Plan</span>
                        </a>
                        <ul className="secondary-navigation" role="navigation">
                            <li className="menu-item"><a href="#" className="menu-item">Discover our cabins</a></li>
                            <li className="menu-item"><a href="#" className="menu-item">Travel essentials</a></li>
                            <li className="menu-item"><a href="#" className="menu-item">Zayed airport</a></li>
                            <li className="menu-item"><a href="#" className="menu-item">Travelling companion</a></li>
                        </ul>
                    </li>
                    <li className="nav-items">
                        <a href="#" className="menu-item" aria-label="">
                            <span className="icon-menu">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.41 9.58L10.41 0.58C10.05 0.22 9.55 0 9 0H2C0.9 0 0 0.9 0 2V9C0 9.55 0.22 10.05 0.59 10.42L9.59 19.42C9.95 19.78 10.45 20 11 20C11.55 20 12.05 19.78 12.41 19.41L19.41 12.41C19.78 12.05 20 11.55 20 11C20 10.45 19.77 9.94 19.41 9.58ZM11 18.01L2 9V2H9V1.99L18 10.99L11 18.01Z" fill="white"></path>
                                </svg>
                            </span>
                            <span className="menu-text">Offers</span>
                        </a>
                        <ul className="secondary-navigation" role="navigation">
                            <li className="menu-item"><a href="#" className="menu-item">Top destinations</a></li>
                            <li className="menu-item"><a href="#" className="menu-item">Special promotions</a></li>
                            <li className="menu-item"><a href="#" className="menu-item">Discover Abu Dhabi</a></li>
                            <li className="menu-item"><a href="#" className="menu-item">Stopover</a></li>
                            <li className="menu-item"><a href="#" className="menu-item">Stopover</a></li>
                            <li className="menu-item"><a href="#" className="menu-item">Stopover</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
        <div className="navbar--grid-items">
            <nav className="primary-navigation" role="navigation">
                <ul className="navigation-item-group">
                    <li className="nav-items">
                        <a href="#" className="menu-item" aria-label="">
                            <span className="icon-menu">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.41 9.58L10.41 0.58C10.05 0.22 9.55 0 9 0H2C0.9 0 0 0.9 0 2V9C0 9.55 0.22 10.05 0.59 10.42L9.59 19.42C9.95 19.78 10.45 20 11 20C11.55 20 12.05 19.78 12.41 19.41L19.41 12.41C19.78 12.05 20 11.55 20 11C20 10.45 19.77 9.94 19.41 9.58ZM11 18.01L2 9V2H9V1.99L18 10.99L11 18.01Z" fill="white"></path>
                                </svg>
                            </span>
                            <span className="menu-text">Help</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
}

export default LeftSideNav;