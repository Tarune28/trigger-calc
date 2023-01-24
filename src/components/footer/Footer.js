import React from "react"
import "./Footer.css"
import logo from "../../TriggerCalc.png";

const Footer = () => <footer className="page-footer font-small blue pt-4">
    <div className="container-fluid text-center text-md-left justify-content-center">
        <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
            <img
          src={logo}
          width="300"
          className="d-inline-block align-top mx-2"
          alt="React Bootstrap logo"
        />
            </div>

            <hr className="clearfix w-100 d-md-none pb-0"/>


            <div className="col-lg-3 mt-4 mx-auto mb-4">
                <div className="list-unstyled">
                    <li><a className="mx-3" href="/">Home</a></li>
                    <li><a className="mx-3" href="/comingSoon">About</a></li>
                    <li><a className="mx-3" href="/comingSoon">Ebook</a></li>
                    <li><a className="mx-3" href="/comingSoon">Contact</a></li>
                </div>
            </div>
        </div>
    </div>

    <div className="footer-copyright text-center py-3">© 2023 Copyright TriggerCalc
    </div>

</footer>

export default Footer