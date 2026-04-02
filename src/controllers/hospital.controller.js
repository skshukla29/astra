async function transferRecord(req, res) {
  const { fromHospital, toHospital, patientName, age, diagnosis, reportName } = req.body;

  return res.json({
    fromHospital,
    toHospital,
    patient: { name: patientName, age, diagnosis, reportName },
    status: "Record securely transferred"
  });
}

module.exports = { transferRecord };
