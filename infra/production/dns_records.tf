data "aws_route53_zone" "meli_com" {
  name         = "sustentabilidadmercadolibre.com"
  private_zone = false
}

resource "aws_route53_record" "meli_com" {
  zone_id = data.aws_route53_zone.meli_com.zone_id
  name    = "sustentabilidadmercadolibre.com"
  type    = "A"

  alias {
    name                   = module.frontend_service.lb_dns_name
    zone_id                = module.frontend_service.lb_zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "www_meli_com" {
  zone_id = data.aws_route53_zone.meli_com.zone_id
  name    = "www.sustentabilidadmercadolibre.com"
  type    = "A"

  alias {
    name                   = module.frontend_service.lb_dns_name
    zone_id                = module.frontend_service.lb_zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "api_meli_com" {
  zone_id = data.aws_route53_zone.meli_com.zone_id
  name    = "api.sustentabilidadmercadolibre.com"
  type    = "A"

  alias {
    name                   = module.backend_service.lb_dns_name
    zone_id                = module.backend_service.lb_zone_id
    evaluate_target_health = true
  }
}
