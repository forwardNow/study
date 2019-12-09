package com.fn.sb.hello.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@ConfigurationProperties(prefix = "swagger")
@Configuration //必须存在
@EnableSwagger2 //必须存在
@EnableWebMvc //必须存在
@Data  //lomlok
//必须存在 扫描的API Controller包
@ComponentScan(basePackages = {"com.fn.sb.hello.controller"})
public class SwaggerConfig {

    private String title;
    private String description;
    private String version;

    private String name;
    private String url;
    private String email;

    @Bean
    public Docket customDocket() {
        return new Docket(DocumentationType.SWAGGER_2).apiInfo(apiInfo());
    }

    private ApiInfo apiInfo() {
        Contact contact = new Contact(name, url, email);
        return new ApiInfoBuilder()
                .title(title)
                .description(description)
                .contact(contact)
                .version(version)
                .build();
    }
}
