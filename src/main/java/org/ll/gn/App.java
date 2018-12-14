package org.ll.gn;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Hello world!
 *
 */
@SpringBootApplication
@Controller
public class App 
{
    public static void main( String[] args )
    {
    	SpringApplication.run(App.class, args);
    }
    
    @GetMapping("/")
    public String index(){
    	return "index";
    }
    
    
}
