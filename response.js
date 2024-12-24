export const StatusOK = (res, msg, payload) => {
  res.status(200).json({
    ok: true,
    msg,
    payload,
  });
};

export const InternalServerError = (res) => {
  res.status(500).json({
    ok: false,
    msg: "Internal Server Error",
  });
};
