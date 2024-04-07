import { selectedNetwork } from "./network";

export const IMAGES_ROOT = "/images";
export const logoSrc = `${IMAGES_ROOT}/logo.svg`;

export const PROJECT_TOKEN = selectedNetwork.tokensID.moge;

// SOCIAL MEDIA CONFIG
export const socialMedia = [
  {
    link: "https://twitter.com/MogeMvx",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        width={"20"}
        height="20"
        className="hover:scale-110"
      >
        <g>
          <path
            fill="currentColor"
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
          ></path>
        </g>
      </svg>
    ),
    label: "Twitter",
  },
  {
    link: "https://t.me/+B1CfxQzwJXwxOWNk",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        width={"20"}
        height="20"
        className="hover:scale-110"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22.5914 0.0395918C21.9293 0.284844 0.898886 8.65108 0.749936 8.72847C-0.12748 9.18423 -0.25237 9.84491 0.46738 10.2233C0.577396 10.2811 1.9371 10.738 3.48891 11.2386L6.3104 12.1487L12.7156 7.99298C16.2384 5.70735 19.2101 3.80707 19.3192 3.77012C19.5859 3.67987 19.7731 3.73129 19.7731 3.89484C19.7731 3.99348 18.6882 5.0307 14.7499 8.69728C11.9871 11.2694 9.65186 13.4451 9.56047 13.532L9.3944 13.69L9.20777 16.4598C9.10512 17.9833 9.02135 19.2841 9.02156 19.3507C9.02198 19.4515 9.05032 19.4715 9.19165 19.4705C9.54962 19.4681 9.77576 19.2862 11.2923 17.7808L12.7883 16.2959L13.058 16.4987C13.2064 16.6103 14.455 17.5583 15.8328 18.6053C17.2106 19.6523 18.4356 20.5541 18.555 20.6092C18.8261 20.7344 19.1848 20.7874 19.4345 20.7391C19.7058 20.6866 20.0433 20.3225 20.1866 19.9276C20.2493 19.7549 21.1331 15.566 22.1505 10.6187C23.5564 3.78319 24.0004 1.53563 24 1.25666C23.9995 0.864146 23.8527 0.441677 23.6537 0.25962C23.4228 0.0483586 22.8744 -0.0652322 22.5914 0.0395918Z"
          fill="currentColor"
        />
      </svg>
    ),
    label: "Telegram",
  },
];
export const resources = [
  {
    link: "https://drive.google.com/file/d/1OlFqHy_uvEJ6Prq2-RJkbMAcQ_7QkzuZ/view",
    icon: "whitepaper",
    label: "Whitepaper",
  },
  {
    link: "https://www.dextools.io/app/en/multiversx/pair-explorer/erd1qqqqqqqqqqqqqpgqh3j3dzk0u2fjadup6ghzs5clymdruuk82jpst5847e?t=1711663852195",
    icon: "dextools",
    label: "Dextools",
  },
  {
    link: "https://octools.app/chart/MOGE-3aadc7",
    icon: "octools",
    label: "Octools",
  },
];

// HOME CONFIG
export const homeHeader = {
  title: "$MOGE is the original $DOGE meme coin based on MultiversX",
  description:
    "Our vision is that of a united pack, where each member is honored as the noblest of hunting dogs.",
};

export const homeSections = [
  {
    title: "+500 Holders",
    subtitle: null,
    description: null,
    img: `${IMAGES_ROOT}/home1.png`,
  },
  {
    title: "Tokenomics",
    subtitle: "7,500,000,000 MOGE",
    description:
      "We consider token management with great responsibility. We are pleased to inform you that we currently hold 430 million MOGE tokens. Our approach to allocating these tokens is designed to foster the growth and prosperity of our community.",
    img: `${IMAGES_ROOT}/home2.png`,
  },
  {
    title: "Together, we hold a bold vision for the future of MOGE.",
    subtitle: null,
    description: null,
    img: `${IMAGES_ROOT}/home3.png`,
  },
];
