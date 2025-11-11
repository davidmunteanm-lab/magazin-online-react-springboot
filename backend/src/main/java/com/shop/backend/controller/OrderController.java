package com.shop.backend.controller;

import com.shop.backend.model.Order;
import com.shop.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        System.out.println("Comanda primită: " + order.getItems().size() + " produse");
        return orderService.createOrder(order);
    }
}
