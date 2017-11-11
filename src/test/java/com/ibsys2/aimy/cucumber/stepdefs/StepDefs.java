package com.ibsys2.aimy.cucumber.stepdefs;

import com.ibsys2.aimy.AimyApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = AimyApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
