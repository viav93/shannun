package com.shannun.core.models;

import com.adobe.cq.wcm.core.components.models.*;
import org.osgi.annotation.versioning.ConsumerType;
import java.util.List;

/**
 * Sling Model interface for the Flight Search Panel component.
 */
@ConsumerType
public interface FlightSearchPanel extends Component {

    /**
     * Returns the title of the flight search panel.
     *
     * @return the title.
     */
    String getTitle();

    /**
     * Returns the description of the flight search panel.
     *
     * @return the description.
     */
    String getDescription();

    /**
     * Returns the selected type of the flight search panel.
     *
     * @return the type.
     */
    String getType();

    /**
     * Returns the list of link items.
     *
     * @return the list of link items.
     */
    List<LinkItem> getLinks();

    /**
     * Returns the teaser image path.
     *
     * @return the teaser image path.
     */
    String getTeaserImage();

	/**
	 * Returns the resource path of the flight search panel.
	 *
	 * @return the resource path.
	 */
	String getResourcePath();
  
}

