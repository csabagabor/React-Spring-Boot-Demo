package backend.articles.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
@EnableCaching
@Slf4j
public class CachingConfig {

    public static final String ARTICLES_CACHE = "articles";

    @Bean
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager(ARTICLES_CACHE);
    }

    @CacheEvict(allEntries = true, value = {ARTICLES_CACHE})
    @Scheduled(fixedDelay = 30 * 60 * 1000, initialDelay = 500)
    public void cacheEvict() {
        log.info("Flush Cache");
    }
}