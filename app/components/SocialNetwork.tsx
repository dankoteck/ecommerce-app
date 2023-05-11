"use client";

import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

type Props = {
  github?: boolean;
  twitter?: boolean;
  facebook?: boolean;
  youtube?: boolean;
  linkedin?: boolean;
};

export default function SocialNetwork({
  github,
  twitter,
  facebook,
  youtube,
  linkedin,
}: Props) {
  return (
    <div className="mt-8">
      <h3 className="sr-only">Social media</h3>
      <div className="flex gap-8">
        {facebook && <FaFacebook className="w-5 h-5 text-gray-500" />}
        {github && <FaGithub className="w-5 h-5 text-gray-500" />}
        {linkedin && <FaLinkedin className="w-5 h-5 text-gray-500" />}
        {twitter && <FaTwitter className="w-5 h-5 text-gray-500" />}
        {youtube && <FaYoutube className="w-5 h-5 text-gray-500" />}
      </div>
    </div>
  );
}
