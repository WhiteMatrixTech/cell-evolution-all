import cn from 'classnames';

import styles from './DialogIcon.less';
import { DialogType } from '../Dialog';

interface DialogIconProps {
  className?: string;
  type: DialogType;
}

export function DialogIcon(props: DialogIconProps) {
  const { className, type } = props;

  return (
    <div className={cn(styles.DialogIcon, className)}>
      {type === DialogType.SUCCESS && (
        <svg
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3274"
          width="18"
          height="18"
        >
          <defs>
            <style type="text/css"></style>
          </defs>
          <path
            d="M512 74.667C270.933 74.667 74.667 270.933 74.667 512S270.933 949.333 512 949.333 949.333 753.067 949.333 512 753.067 74.667 512 74.667z m0 810.666C307.2 885.333 138.667 716.8 138.667 512S307.2 138.667 512 138.667 885.333 307.2 885.333 512 716.8 885.333 512 885.333z"
            p-id="3275"
            fill="#8dddf6"
          ></path>
          <path
            d="M701.867 381.867L448 637.867 322.133 512c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l149.334 149.333c6.4 6.4 14.933 8.534 23.466 8.534s17.067-2.134 23.467-8.534L750.933 428.8c12.8-12.8 12.8-32 0-44.8-14.933-12.8-36.266-12.8-49.066-2.133z"
            p-id="3276"
            fill="#8dddf6"
          ></path>
        </svg>
      )}
      {type === DialogType.ERROR && (
        <svg
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2326"
          width="18"
          height="18"
        >
          <defs>
            <style type="text/css"></style>
          </defs>
          <path
            d="M480 64.512c-34.752 0-69.504 16.512-89.28 49.472L14.528 742.72C-25.472 809.28 25.728 896 103.488 896H856.32c78.016 0 129.28-86.72 89.472-153.28L569.28 113.984A102.848 102.848 0 0 0 480 64.512z m0 62.976c13.248 0 26.496 6.528 34.56 19.52l376.192 628.48c15.744 26.24-1.728 56.512-34.56 56.512H103.616c-32.576 0-50.048-30.272-34.304-56.512l376.256-628.48a40.256 40.256 0 0 1 34.496-19.52zM447.488 320v320h64V320z m0 384v64h64v-64z"
            fill="#8dddf6"
            p-id="2327"
          ></path>
        </svg>
      )}

      {type === DialogType.INFO && (
        <svg
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4191"
          width="18"
          height="18"
        >
          <defs>
            <style type="text/css"></style>
          </defs>
          <path
            d="M512 384a42.666667 42.666667 0 0 0-42.666667 42.666667v346.026666a42.666667 42.666667 0 0 0 85.333334 0V426.666667a42.666667 42.666667 0 0 0-42.666667-42.666667z"
            p-id="4192"
            fill="#8dddf6"
          ></path>
          <path
            d="M512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0z m0 938.666667a426.666667 426.666667 0 1 1 426.666667-426.666667 426.666667 426.666667 0 0 1-426.666667 426.666667z"
            p-id="4193"
            fill="#8dddf6"
          ></path>
          <path
            d="M512 272.64m-42.666667 0a42.666667 42.666667 0 1 0 85.333334 0 42.666667 42.666667 0 1 0-85.333334 0Z"
            p-id="4194"
            fill="#8dddf6"
          ></path>
        </svg>
      )}
    </div>
  );
}
