import Papa from "papaparse";
import format from "string-template";
import { v4 } from "uuid";
import { COULD_NOT_PARSE_HEADER } from "constants/messageConstants";
import { CSV_FILE_MINE_TYPE, PROMISE_STATUS } from "constants/constants";

export const parseFile = (file, config = {}) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      complete: ({ data: lines }) => {
        if (lines && lines[0]) {
          const mappings = lines[0].map((headerField) => ({ headerField }));
          resolve({ file, id: file.id, mappings, data: lines.slice(1) });
        } else {
          reject(new Error(format(COULD_NOT_PARSE_HEADER, [file.name])));
        }
      },
      skipEmptyLines: true,
      ...config
    });
  });
};

export const parseFiles = async (files, config) => {
  const res = await Promise.allSettled(
    files?.map((file) => parseFile(file, config)) || []
  );

  return res.reduce(
    (result, cur, index) => {
      if (cur.status === PROMISE_STATUS.FULFILLED) {
        result[PROMISE_STATUS.FULFILLED].push({ ...cur.value });
      } else {
        result[PROMISE_STATUS.REJECTED].push({
          error: cur.reason.message,
          file: files[index]
        });
      }

      return result;
    },
    { [PROMISE_STATUS.FULFILLED]: [], [PROMISE_STATUS.REJECTED]: [] }
  );
};

export const isExistFile = (file, currentFiles = []) =>
  currentFiles?.some((ele) => {
    return ele?.name === file?.name && ele?.lastModified === file?.lastModified;
  });

export const addIdForFile = (file) => {
  if (!file) return null;
  file.id = v4();
  return file;
};

export const isCSVFile = (file) => {
  return file?.type === CSV_FILE_MINE_TYPE;
};

export const getValidFiles = (files, currentFiles = []) =>
  files
    ?.filter((file) => isCSVFile(file) && !isExistFile(file, currentFiles))
    .map((file) => addIdForFile(file))
    .filter(Boolean);

export const getFileNames = (files) => {
  return files?.map((file) => file?.name).join(", ");
};
