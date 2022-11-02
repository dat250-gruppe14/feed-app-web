import { pathToRegexp } from 'path-to-regexp';
import { baseRoutes } from 'src/routes/baseRoutes';

export const LOGIN_HEADER = 'FEEDAPP';
export const mapRouteToHeaderTitle = (path: string) => {
  if (path.match(pathToRegexp(baseRoutes.index))) return 'Polls';
  if (path.match(pathToRegexp(baseRoutes.createPoll))) return 'New poll';
  if (path.match(pathToRegexp(baseRoutes.editPoll))) return 'Edit poll';
  if (path.match(pathToRegexp(baseRoutes.pollById))) return 'Vote';
  if (path.match(pathToRegexp(baseRoutes.profile))) return 'Profile';
  if (path.match(pathToRegexp(baseRoutes.login))) return LOGIN_HEADER;
  if (path.match(pathToRegexp(baseRoutes.register))) return LOGIN_HEADER;
  return '';
};

export const calculatePercentage = (value: number, total: number): number => (value / total * 100);

export const getRemainingPollDays = (endDate: Date | undefined): number | undefined => {
  const msPerDay = 24 * 60 * 60 * 1000;

  const now = new Date();

  const difference = endDate ? Math.round(Math.abs(Number(endDate)- Number(now)) / msPerDay) : undefined;

  return difference;
};

const msInDay = 24 * 60 * 60 * 1000;
const msInHour = 60 * 60 * 1000;
const msInMinut = 60 * 60 * 1000;

const getRemainingTimeWithUnit = (timeDiff: number): string => {
	if (timeDiff < msInHour){
		const diffInMinutes = Math.round(timeDiff / msInMinut)
		return diffInMinutes === 1 ? `${diffInMinutes} minut` : `${diffInMinutes} minutes`;
	}
	if (timeDiff < msInDay){
		const diffInHours = Math.round(timeDiff / msInHour)
		return diffInHours === 1 ? `${diffInHours} hour` : `${diffInHours} hours`;
	}

  const diffInDays = Math.round(timeDiff / msInDay); 
	return diffInDays === 1 ? `${diffInDays} day` : `${diffInDays} days`;
}

export const getRemainingTime = (endDate: Date | undefined): string => {
	if (endDate === undefined){
		return '';
	}
	const timeDiff = Number(endDate) - Number(new Date())
	console.log({timeDiff})

	const diffWithTimeUnit = getRemainingTimeWithUnit(Math.abs(timeDiff))

	return timeDiff >= 0 ? `${diffWithTimeUnit} left` : `Expired ${diffWithTimeUnit} ago`;

}
