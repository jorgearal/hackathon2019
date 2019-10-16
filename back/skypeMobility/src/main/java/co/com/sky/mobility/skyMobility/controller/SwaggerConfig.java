package co.com.sky.mobility.skyMobility.controller;

import java.util.Collections;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

	public Docket api() {

		return new Docket(DocumentationType.SWAGGER_2).select()
				.apis(RequestHandlerSelectors.basePackage("co.com.aws.encuestasAws.controller"))
				.paths(PathSelectors.any()).build().apiInfo(apiInfo());

	}

	private ApiInfo apiInfo() {

		return new ApiInfo("Api de movilidad", "servicios para el api de movilidad", "1.0", "terminios y servicios",
				new Contact("jhon fredy", "", "jfgalean@bancolombia.com.co"), "Licencia", "", Collections.emptyList());

	}

}
