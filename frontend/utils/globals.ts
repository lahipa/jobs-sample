export const makeRandomID = (length: number) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  let id = "";
  let i = 0;
  for (i; i < length; i += 1) {
    id += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return id;
};

export const encoded = (value: string) => {
  return Buffer.from(value).toString("base64");
};

export const decoded = (value: string) => {
  return Buffer.from(value, "base64").toString();
};

/**
 *
 * @param {*} data
 * @param {*} format
 * @param {*} utc
 *
 * Formatting datetime javascript value into the design needed
 *
 * How to use -> formatDateTime(data, "dd MMM y")
 * Result -> 12 Jun 2020
 *
 */
 export const formatDateTime = (data: any, format: string, utc: string = "") => {
  const date = new Date(data);

  let formated = format;

  const MMMM = [
    "\x00",
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const MMM = [
    "\x01",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agt",
    "Sep",
    "Oct",
    "Nov",
    "Des",
  ];

  const dddd = [
    "\x02",
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];

  const ddd = ["\x03", "Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  const ii = (i: any, len?: any) => {
    let s = `${i}`;
    const length = len || 2;

    while (s.length < length) {
      s = `0${s}`;
    }

    return s;
  };

  const y = utc ? date.getUTCFullYear() : date.getFullYear();
  formated = formated.replace(/(^|[^\\])yyyy+/g, `$1${y}`);
  formated = formated.replace(/(^|[^\\])yy/g, `$1${y.toString().substr(2, 2)}`);
  formated = formated.replace(/(^|[^\\])y/g, `$1${y}`);

  const M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
  formated = formated.replace(/(^|[^\\])MMMM+/g, `$1${MMMM[0]}`);
  formated = formated.replace(/(^|[^\\])MMM/g, `$1${MMM[0]}`);
  formated = formated.replace(/(^|[^\\])MM/g, `$1${ii(M)}`);
  formated = formated.replace(/(^|[^\\])M/g, `$1${M}`);

  const d = utc ? date.getUTCDate() : date.getDate();
  formated = formated.replace(/(^|[^\\])dddd+/g, `$1${dddd[0]}`);
  formated = formated.replace(/(^|[^\\])ddd/g, `$1${ddd[0]}`);
  formated = formated.replace(/(^|[^\\])dd/g, `$1${ii(d)}`);
  formated = formated.replace(/(^|[^\\])d/g, `$1${d}`);

  const H = utc ? date.getUTCHours() : date.getHours();
  formated = formated.replace(/(^|[^\\])HH+/g, `$1${ii(H)}`);
  formated = formated.replace(/(^|[^\\])H/g, `$1${H}`);

  let h = 0;
  if (H > 12) {
    h = H - 12;
  } else if (H === 0) {
    h = 12;
  } else {
    h = H;
  }

  formated = formated.replace(/(^|[^\\])hh+/g, `$1${ii(h)}`);
  formated = formated.replace(/(^|[^\\])h/g, `$1${h}`);

  const m = utc ? date.getUTCMinutes() : date.getMinutes();
  formated = formated.replace(/(^|[^\\])mm+/g, `$1${ii(m)}`);
  formated = formated.replace(/(^|[^\\])m/g, `$1${m}`);

  const s = utc ? date.getUTCSeconds() : date.getSeconds();
  formated = formated.replace(/(^|[^\\])ss+/g, `$1${ii(s)}`);
  formated = formated.replace(/(^|[^\\])s/g, `$1${s}`);

  let f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
  formated = formated.replace(/(^|[^\\])fff+/g, `$1${ii(f, 3)}`);
  f = Math.round(f / 10);
  formated = formated.replace(/(^|[^\\])ff/g, `$1${ii(f)}`);
  f = Math.round(f / 10);
  formated = formated.replace(/(^|[^\\])f/g, `$1${f}`);

  const T = H < 12 ? "AM" : "PM";
  formated = formated.replace(/(^|[^\\])TT+/g, `$1${T}`);
  formated = formated.replace(/(^|[^\\])T/g, `$1${T.charAt(0)}`);

  const t = T.toLowerCase();
  formated = formated.replace(/(^|[^\\])tt+/g, `$1${t}`);
  formated = formated.replace(/(^|[^\\])t/g, `$1${t.charAt(0)}`);

  let tz = -date.getTimezoneOffset();
  let K = utc;

  if (!tz) {
    K = "Z";
  } else if (tz > 0) {
    K = "+";
  } else {
    K = "-";
  }

  if (!utc) {
    tz = Math.abs(tz);
    const tzHrs = Math.floor(tz / 60);
    const tzMin = tz % 60;

    K += `${ii(tzHrs)}:${ii(tzMin)}`;
  }

  formated = formated.replace(/(^|[^\\])K/g, `$1${K}`);

  const day = (utc ? date.getUTCDay() : date.getDay()) + 1;
  formated = formated.replace(new RegExp(dddd[0], "g"), dddd[day]);
  formated = formated.replace(new RegExp(ddd[0], "g"), ddd[day]);

  formated = formated.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
  formated = formated.replace(new RegExp(MMM[0], "g"), MMM[M]);

  formated = formated.replace(/\\(.)/g, "$1");

  return formated;
};

/**
 *
 * @param {*} data
 *
 * Convert times into times ago.
 *
 */
export const convertTimeAgo = (data: any) => {
  const now: any = new Date();
  const past: any = new Date(data);
  const elapsed = now - past;

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 365 * day;

  if (!data) {
    return "unseen";
  }

  if (elapsed < minute) {
    return "recently";
  }

  if (elapsed < hour) {
    return `${Math.round(elapsed / minute)} minutes ago`;
  }

  if (elapsed < day) {
    return `${Math.round(elapsed / hour)} hours ago`;
  }

  if (elapsed < month) {
    return `${Math.round(elapsed / day)} days ago`;
  }

  if (elapsed < year) {
    return `${Math.round(elapsed / month)} months ago`;
  }

  return `${Math.round(elapsed / year)} years ago`;
};
