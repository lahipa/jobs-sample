const { default: axios } = require("axios");

const getJobPositions = async (req, res) => {
  try {
    const params = req.query;

    const endpoint = "/recruitment/positions.json";
    const response = await axios.get(process.env.DANS_API_URL + endpoint, { params });

    res.status(200).send({
      status: {
        code: 200,
        message: "OK",
      },
      data: response.data
    });
  } catch (err) {
    res.status(400).send({
      status: {
        code: 400,
        message: err.message,
      },
    });
  }
};

const getDetailPosition = async (req, res) => {
  try {
    const params = req.params;

    const endpoint = `/recruitment/positions/${params.id}`;
    const response = await axios.get(process.env.DANS_API_URL + endpoint);

    res.status(200).send({
      status: {
        code: 200,
        message: "OK",
      },
      data: response.data
    });
  } catch (err) {
    res.status(400).send({
      status: {
        code: 400,
        message: err.message,
      },
    });
  }
}

module.exports = {
  getJobPositions,
  getDetailPosition,
}
