package backend.articles.service;

import backend.articles.model.dto.ArticleDto;
import backend.articles.model.dto.ArticleDtoList;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

import static backend.articles.config.CachingConfig.ARTICLES_CACHE;

@RequiredArgsConstructor
@Service
public class ArticleService {
    private final RestTemplate restTemplate;

    @Value("${url}")
    private String url;

    @Cacheable(value = ARTICLES_CACHE, key = "#keyword")
    public List<ArticleDto> findAllByKeywords(String keyword) {
        ResponseEntity<ArticleDtoList> responseEntity = restTemplate.exchange(
                url + keyword,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<>() {
                });

        return responseEntity.getBody().getNews();
    }

}
