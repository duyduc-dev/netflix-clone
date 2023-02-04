import * as React from 'react';
import { FaFacebookF } from 'react-icons/fa';
import { BsInstagram, BsTwitter, BsYoutube } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="pt-16 bg-chinese_black">
      <div className="max-w-[980px] mt-5 mx-auto w-full p-[4%]">
        <div className="flex items-center text-white text-[20px] gap-5">
          <FaFacebookF />
          <BsInstagram />
          <BsTwitter />
          <BsYoutube />
        </div>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-3 mt-5 text-gray_80 text-[13px]">
          <li>Audio Description</li>
          <li>Help Center</li>
          <li>Gift Cards</li>
          <li>Media Center</li>
          <li>Investor Relations</li>
          <li>Jobs</li>
          <li>Terms of Use</li>
          <li>Privacy</li>
          <li>Legal Notices</li>
          <li>Cookie Preferences</li>
          <li>Corporate Information</li>
          <li>Contact Us</li>
        </ul>
        <div className="text-gray_80 text-[12px] mt-5">© 1997-2023 Netflix, Inc.</div>
      </div>
    </footer>
  );
};

export default Footer;
