package backend.articles.model.dto;

import lombok.Data;

import java.util.List;

@Data
public class ArticleDtoList {
    private List<ArticleDto> news;
}