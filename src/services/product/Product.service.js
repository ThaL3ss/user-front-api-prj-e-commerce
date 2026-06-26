import gatewayService from '../gateway/Gateway.service'

export const getAllProducts = () => gatewayService.get('/gateway/produto')
export const getProductById = (id) => gatewayService.get(`/gateway/produto/${id}`)
