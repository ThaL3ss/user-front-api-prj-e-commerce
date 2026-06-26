import gatewayService from '../gateway/Gateway.service'

export const getCart        = ()          => gatewayService.get('/gateway/carrinho')
export const addCartItem    = (item)      => gatewayService.post('/gateway/carrinho/itens', item)
export const updateCartItem = (id, qty)   => gatewayService.patch(`/gateway/carrinho/itens/${id}`, { quantidade: qty })
export const removeCartItem = (id)        => gatewayService.delete(`/gateway/carrinho/itens/${id}`)
export const clearServerCart = ()         => gatewayService.delete('/gateway/carrinho')
