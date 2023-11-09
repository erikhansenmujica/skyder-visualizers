import { useTranslation } from "@/app/i18n/client";
import { Job } from "@/lib/definitions";

interface LatestCustomersProps {
  lng: string;
  youtube?: boolean;
  jobs: Job[];
}
interface CustomersProps {
  name: string;
  song: string;
  lng: string;
  link?: string;
  time?: string;
}
const Customer = ({ name, song, link, time, lng }: CustomersProps) => {
  const { t } = useTranslation(lng, "titlesandsubtitles");
  return (
    <li className="py-3 sm:py-4 ">
      <div className="flex items-center md:space-x-4">
        <div className="flex-shrink-0">
          {/* <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-2.jpg" alt="Michael image"> */}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {!link ? (
              name
            ) : (
              <a
                target="_blank"
                className="hover:text-gray-400 cursor-pointer"
                href={link}
              >
                {link}
              </a>
            )}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {song}
          </p>
        </div>
        {time ? (
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            {t("donein")} {time}
          </div>
        ) : (
          <div />
        )}
      </div>
    </li>
  );
};

export const LatestCustomers = ({
  jobs,
  lng,
  youtube,
}: LatestCustomersProps) => {
  const { t } = useTranslation(lng, "titlesandsubtitles");
  return (
    <div className="z-10 text-2xl flex-1 max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          {youtube ? t("linktovideos") : t("latestcustomers")}
        </h5>
        {/* <a
        href="#"
        className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
      >
        View all
      </a> */}
      </div>
      <div className="flow-root">
        {youtube && jobs ? (
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {jobs.map((job) => (
              <Customer
                lng={lng}
                key={job.id}
                name={job.artist}
                link={job.link}
                song={job.song_name}
              />
            ))}
          </ul>
        ) : (
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {jobs &&
              jobs.map((job) => (
                <Customer
                  lng={lng}
                  key={job.id}
                  name={job.artist}
                  song={job.song_name}
                  time={job.time_spent}
                />
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};
