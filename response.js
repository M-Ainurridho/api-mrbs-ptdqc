export const InternalServerError = (res) => {
  res.status(500).json({
    ok: false,
    msg: "Internal Server Error",
  });
};
