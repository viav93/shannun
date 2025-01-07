package com.shannun.core.models.impl;

import com.shannun.core.models.LinkItem;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Sling Model implementation for the Link Item used in the Flight Search Panel component.
 */
@Model(
        adaptables = Resource.class,
        adapters = LinkItem.class,
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class LinkItemImpl implements LinkItem {

    private static final Logger LOG = LoggerFactory.getLogger(LinkItemImpl.class);

    @ValueMapValue
    private String ctaLink;

    @ValueMapValue
    private String ctaText;

    /**
     * Returns the CTA link.
     *
     * @return the CTA link.
     */
    @Override
    public String getCtaLink() {
        LOG.debug("Fetching CTA link: {}", ctaLink);
        return ctaLink;
    }

    /**
     * Returns the CTA text.
     *
     * @return the CTA text.
     */
    @Override
    public String getCtaText() {
        LOG.debug("Fetching CTA text: {}", ctaText);
        return ctaText;
    }
}

