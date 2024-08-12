import React from "react";
import { Container, ImageContainer } from "@/src/components/ui/ui";
import Link from "next/link";
import styles from "@/src/components/layout/Footer/footer.module.css";

export default function Footer() {
  return (
    <footer className="bg-slate-200">
      <Container>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 py-12">
          <div className="first">
            <div className="relative w-full max-w-[200px] h-auto md:mb-2 mb-4">
              <ImageContainer
                src="https://res.cloudinary.com/desggllml/image/upload/w_200,h_55,e_improve,e_sharpen/v1723461642/smi-logo_fmmcqy.png"
                alt="SMI shop mart"
                height={388}
                width={1446}
                className="w-full h-auto"
                priority
              />
            </div>
            <ul>
              <li className={styles.li}>
                <span className={styles.span}>Address:</span>
                Punjab, Pakistan
              </li>

              <li className={styles.li}>
                <span className={styles.span}>Phone:</span> +92 318 4910 327
              </li>

              <li className={styles.li}>
                <span className={styles.span}>Email:</span>{" "}
                smistore528982@gmail.com
              </li>
            </ul>
          </div>
          <div className="second md:mb-0 mb-5">
            <h3 className={styles.h3}>Useful Links</h3>
            <ul className="grid grid-cols-2 gap-2 items-center gap-y-5">
              <li>
                <Link href="/" className={styles.link}>
                  Home
                </Link>
              </li>
              <li className={styles.link}>About Us</li>
              <li className={styles.link}>Contact Us</li>
              <li className={styles.link}>Secure Shopping</li>
              <li className={styles.link}>Delivery infomation</li>
              <li className={styles.link}>Our Services</li>
              <li className={styles.link}>Innovation</li>
              <li className={styles.link}>FAQ&apos;s</li>
            </ul>
          </div>
          <div className="third">
            <h3 className={styles.h3}>Join Our Newsletter Now</h3>
            <p className="mb-7 text-gray-600 text-sm">
              Get E-mail updates about our latest shop and special offers.
            </p>

            <div className="input min-w-full flex items-center my-4">
              <input
                type="email"
                className="sm:h-12 h-10 px-4 w-full border-none"
                placeholder="Enter your Email"
              />
              <button className="sm:py-3 py-2 sm:px-6 px-4 button_solid">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </Container>
      <div className="py-4 border-t-[1px] border-solid border-gray-300 ">
        <Container>
          <div className="">
            <p className="text-gray-700 lg:text-left text-center text-sm">
              Copyright ©2024 All rights reserved.
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
