import React from "react";
import Link from "next/link";
import { Container, ImageContainer } from "@/src/components/ui/ui";
import styles from "@/src/components/layout/Footer/footer.module.css";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import {
  FACEBOOOK_SOCIAL_URL,
  INSTRAGRAM_SOCIAL_URL,
  LOGO_IMAGE,
  LOGO_TITLE,
  WHATSAPP_SOCIAL_URL,
} from "@/src/utils/constant";

export default function Footer() {
  return (
    <footer className="bg-slate-200">
      <Container>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 py-16">
          <div className="first">
            <div className="relative w-full max-w-[200px] h-auto">
              <ImageContainer
                src={LOGO_IMAGE}
                alt={LOGO_TITLE}
                height={388}
                width={1446}
                className="w-full h-auto"
                priority
              />
            </div>
            <ul className="my-5">
              <li className={styles.li}>
                <span className={styles.span}>Address:</span>
                Lahore, Punjab, Pakistan
              </li>

              <li className={styles.li}>
                <span className={styles.span}>Phone:</span> +92 318 4910 327
              </li>

              <li className={styles.li}>
                <span className={styles.span}>Email:</span>{" "}
                smistore528982@gmail.com
              </li>
            </ul>
            <div className="social_footer">
              <ul className="flex gap-4 items-center">
                <li className={styles.socialLink}>
                  <Link href={FACEBOOOK_SOCIAL_URL}>
                    <FaFacebook size={18} />
                  </Link>
                </li>
                <li className={styles.socialLink}>
                  <Link href={INSTRAGRAM_SOCIAL_URL}>
                    <FaInstagram size={18} />
                  </Link>
                </li>
                <li className={styles.socialLink}>
                  <Link href={WHATSAPP_SOCIAL_URL}>
                    <FaWhatsapp size={18} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="second md:mb-0 mb-5">
            <h3 className={styles.h3}>Useful Links</h3>
            <ul className="grid grid-cols-1 gap-2 items-center gap-y-4">
              <li>
                <Link href="/" className={styles.link}>
                  Home
                </Link>
              </li>
              <li className={styles.link}>Order Tracking</li>
              <li className={styles.link}>Returns / Exchanges</li>
              <li className={styles.link}>Refund Policy</li>
              <li className={styles.link}>Our Services</li>
              {/* <li className={styles.link}>Innovation</li> */}
              <li className={styles.link}>Term & Conditions</li>
            </ul>
          </div>
          <div className="third">
            <h3 className={styles.h3}>Join Our Newsletter Now</h3>
            <p className="mb-7 text-gray-600">
              Get updates all the best deals, sales and special offers from the
              best online shopping store in Pakistan.{" "}
              <Link href="/create-account">Sign up now</Link> !
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
