/*
 *  Copyright 2015 Adobe Systems Incorporated
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
package com.shannun.core.models.impl;

import static org.apache.sling.api.resource.ResourceResolver.PROPERTY_RESOURCE_TYPE;

import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

import javax.annotation.PostConstruct;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.RequestAttribute;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.drew.lang.annotations.NotNull;
import com.drew.lang.annotations.Nullable;
import com.shannun.core.models.Flashcards;

@Model(adaptables = {SlingHttpServletRequest.class, Resource.class}, adapters = {Flashcards.class, ComponentExporter.class}, resourceType = FlashcardsImpl.RESOURCE_TYPE)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class FlashcardsImpl implements Flashcards {

    protected static final String RESOURCE_TYPE = "shannun/components/content/flashcards";
    private static final Logger LOGGER = LoggerFactory.getLogger(FlashcardsImpl.class);


    @ValueMapValue(name=PROPERTY_RESOURCE_TYPE, injectionStrategy=InjectionStrategy.OPTIONAL)
    @Default(values="No resourceType")
    protected String resourceType;

    @RequestAttribute
    private String roger;

    @RequestAttribute
    private String foo;

    
    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    @Nullable
    protected String flashcardPath;

    private String flashCardData;

    @SlingObject
    private ResourceResolver resourceResolver;

    @ScriptVariable
    private SlingHttpServletRequest request;

    private String cards;

    @PostConstruct
    protected void init() {

        if ( flashcardPath != null) {
            Resource flashCardItemsResource = resourceResolver.getResource(flashcardPath + "/jcr:content/list");

            assert flashCardItemsResource != null;
            List<Resource> words = collectChildren(flashCardItemsResource).collect(Collectors.toList());


        }


        cards = "Hello World!\n"
            + "Resource type is: " + resourceType + "\n";
    }

    private static Stream<Resource> collectChildren(@NotNull final Resource parent) {
        Iterator<Resource> childIterator = parent.listChildren();
        return StreamSupport.stream(((Iterable<Resource>) () -> childIterator).spliterator(), false)
                .flatMap(child -> Stream.concat(Stream.of(child), collectChildren(child)));
    }

    public String getCards() {
        return cards;
    }

    public String getFlashcardPath() {
        return flashcardPath;
    }

    public String getFlashCardData() {
        return flashCardData;
    }

    public void setFlashCardData(String flashCardData) {
        this.flashCardData = flashCardData;
    }

}