module.exports = {
  statusCode: 400,
  body: '{"error": {"code": "VALIDATION_ERROR", "description": "\'Bearer xyz\' does not match \'^(?i)Bearer [A-Za-z0-9\\\\\\\\-\\\\\\\\_]{128}$\'", "field": "Authorization", "instance": "Bearer xyz"}}'
}
