package com.shannun.core.models;

import com.adobe.cq.wcm.core.components.models.Component;
import org.osgi.annotation.versioning.ConsumerType;

/**
 * Sling Model interface for the Link Item used in the Flight Search Panel component.
 */
@ConsumerType
public interface LinkItem extends Component {

    /**
     * Returns the CTA link.
     *
     * @return the CTA link.
     */
    String getCtaLink();

    /**
     * Returns the CTA text.
     *
     * @return the CTA text.
     */
    String getCtaText();
}

