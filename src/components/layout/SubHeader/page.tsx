import React from "react";
import styles from "./subHeader.module.scss";
import Link from "next/link";
import SubHeaderSocial from "./social";

export default function SubHeader() {
  return (
    <>
      <section className={styles.subHeader}>
        <div className={styles.leftinfo}>
          <ul>
            <li>
              <Link href="#">About Us</Link>
            </li>
            <li>
              <Link href="#">Privacy</Link>
            </li>
            <li>
              <Link href="#">FAQ</Link>
            </li>
          </ul>
        </div>
        <div className={styles.rightinfo}>
          <ul className="flex gap-4">
            <li>
              <Link href="#" className="text-sm">
                Track Order
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm">
                My Wishlist
              </Link>
            </li>
          </ul>
          <SubHeaderSocial />
        </div>
      </section>
    </>
  );
}
