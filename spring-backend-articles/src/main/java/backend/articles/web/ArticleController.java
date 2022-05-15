package backend.articles.web;

import backend.articles.model.dto.ArticleDto;
import backend.articles.service.ArticleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
@Slf4j
public class ArticleController {
    private final ArticleService articleService;

    @GetMapping("/articles")
    @Operation(summary = "Get all articles by keyword", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<?> getAllByKeyword(@RequestParam String keyword) {
        List<ArticleDto> articles = articleService.findAllByKeywords(keyword);
        return new ResponseEntity<>(articles, HttpStatus.OK);
    }
}


