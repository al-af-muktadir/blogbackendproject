import { Response } from "express";

type TSuccess<T> = {
  success?: boolean;

  token?: string;
  statusCode: number;
  message: string;
  data?: T | T[] | null;
};

const sendsResponse = <T>(res: Response, data: TSuccess<T>) => {
  res.status(data.statusCode).send({
    success: true,

    token: data.token,
    StatusCode: data.statusCode,
    message: data.message,
    data: data.data,
  });
};
export default sendsResponse;
