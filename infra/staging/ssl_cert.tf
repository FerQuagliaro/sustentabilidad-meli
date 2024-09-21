resource "aws_acm_certificate" "sustentabilidad_com" {
  domain_name   = "sustentabilidadmercadolibre.com"
  subject_alternative_names = ["*.sustentabilidadmercadolibre.com"]
  validation_method = "DNS"
}
