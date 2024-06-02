import md5 from "md5";

export const apiKey = {
  Public: "49f3879f5436855a4523742492cba08b",
  Private: "d029af2d664a995f1f1df472fdce9bc7caec27cd",
  Timestamp: "1",
  Hash: md5(
    "1d029af2d664a995f1f1df472fdce9bc7caec27cd49f3879f5436855a4523742492cba08b"
  ),
};
