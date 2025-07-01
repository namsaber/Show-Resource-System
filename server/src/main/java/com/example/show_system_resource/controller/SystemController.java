package com.example.show_system_resource.controller;

import com.example.show_system_resource.model.SystemInformation;
import com.example.show_system_resource.services.SystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/system-info")
@CrossOrigin(origins = "http://localhost:5173")
public class SystemController {

    private final SystemService systemService;

    @Autowired
    public SystemController(SystemService systemService) {
        this.systemService = systemService;
    }

    @GetMapping
    public SystemInformation getSystemInfo() {
        return systemService.getSystemInfo();
    }

}
