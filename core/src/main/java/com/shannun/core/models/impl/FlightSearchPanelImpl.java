package com.shannun.core.models.impl;

import com.shannun.core.models.*;
import com.adobe.cq.export.json.*;
import com.adobe.cq.wcm.core.components.models.*;
import com.adobe.cq.wcm.core.components.util.AbstractComponentImpl;

import org.apache.sling.api.resource.*;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.*;
import org.apache.sling.models.annotations.injectorspecific.*;
import org.slf4j.*;


import java.util.List;
import java.util.stream.*;

/**
 * Sling Model implementation for the Flight Search Panel component.
 */
@Model(
        adaptables = SlingHttpServletRequest.class,
        adapters = { FlightSearchPanel.class, Component.class, ComponentExporter.class },
        resourceType = "shannun/components/flight-search-panel",
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class FlightSearchPanelImpl extends AbstractComponentImpl implements FlightSearchPanel {

    private static final Logger LOG = LoggerFactory.getLogger(FlightSearchPanelImpl.class);

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String description;

    @ValueMapValue
    private String type;

    @ChildResource
    private Resource links;

    @ValueMapValue
    private String teaserImage;

    
    /**
     * Returns the title of the flight search panel.
     *
     * @return the title.
     */
    @Override
    public String getTitle() {
        LOG.debug("Fetching title: {}", title);
        LOG.debug("Fetching this.getId(): {}", this.getId());

        return title ;
    }

    /**
     * Returns the description of the flight search panel.
     *
     * @return the description.
     */
    @Override
    public String getDescription() {
        LOG.debug("Fetching description: {}", description);
        return description;
    }

    /**
     * Returns the selected type of the flight search panel.
     *
     * @return the type.
     */
    @Override
    public String getType() {
        LOG.debug("Fetching type: {}", type);
        return type;
    }

    /**
     * Returns the list of link items.
     *
     * @return the list of link items.
     */
    @Override
    public List<LinkItem> getLinks() {
        if (links != null) {
            LOG.debug("Fetching links from resource: {}", links.getPath());
            return StreamSupport.stream(links.getChildren().spliterator(), false)
                    .map(childResource -> {
                        LinkItem linkItem = childResource.adaptTo(LinkItem.class);
                        if (linkItem == null) {
                            LOG.error("Failed to adapt child resource to LinkItem: {}", childResource.getPath());
                        }
                        return linkItem;
                    })
                    .collect(Collectors.toList());
        }
        LOG.warn("Links resource is null");
        return null;
    }

    /**
     * Returns the teaser image path.
     *
     * @return the teaser image path.
     */
    @Override
    public String getTeaserImage() {
        LOG.debug("Fetching teaser image: {}", teaserImage);
        return teaserImage;
    }
    
    /**
     * Returns the resource path of the flight search panel.
     *
     * @return the resource path.
     */
    @Override
    public String getResourcePath() {
        if (resource != null) {
            String path = resource.getPath();
            LOG.debug("Fetching resource path: {}", path);
            return path;
        } else {
            LOG.error("Resource is null");
            return "";
        }
    }  
}

