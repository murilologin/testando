package br.com.teste.config;


import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.swagger2.annotations.EnableSwagger2;


//@EnableSwagger2
@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI springShopOpenAPI() {
        return new OpenAPI()
                .info(new Info().title("Cadastro WEB API")
                        .description("Cadastro WEB API <strong>ApiTeste</strong>.")
                        .version("v1.0.0")
                        .contact(new Contact()
                                .email("murilo.login@gmail.com")
                                .url("https://www.linkedin.com/in/jorge-murilo-049b18175")
                                .name("Cadastro WEB API")))
                .components(new Components()
                        .addSecuritySchemes("bearer-key",
                                new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT")));
    }

    /**
    @Bean
    public Docket docket() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.cursodsousa.libraryapi.api.resource") )
                .paths(PathSelectors.any())
                .build()
                .apiInfo(apiInfo());
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("Library API")
                .description("API do projeto de controle de aluguel de livros")
                .version("1.0")
                .contact(contact())
                .build();
    }

    private Contact contact() {
        return new Contact("Jorge Murilo", "http://github.com/murilologin", "murilo.login@gmail.com");
    }
    **/
}
