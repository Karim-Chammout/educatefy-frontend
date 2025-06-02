import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Menu from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { CourseSectionFragment } from '@/generated/graphql';
import { Typography } from '@/ui/components';
import { getMediaUrl } from '@/utils/getMediaUrl';

import {
  ComponentButton,
  ContentArea,
  ItemButton,
  MobileMenuButton,
  NavigationPanel,
  SectionContainer,
  TextContent,
  VideoComponent,
} from './Section.style';

const Section = ({ section }: { section: CourseSectionFragment }) => {
  const { slug, itemId, componentId } = useParams();
  const navigate = useNavigate();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({ [itemId as string]: true });
  const [mobileOpen, setMobileOpen] = useState(false);

  // Find the initially selected item and component from URL params
  const selectedItem = section.items.find((item) => item.id === itemId) || section.items[0];

  if (!selectedItem) {
    return <Typography>No content found</Typography>;
  }

  const selectedComponent =
    selectedItem.components.find((comp) => comp.component_id === componentId) ||
    selectedItem.components[0];

  const handleItemClick = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleComponentClick = (itemID: string, componentID: string) => {
    navigate(`/course/${slug}/section/${section.id}/item/${itemID}/component/${componentID}`);
    setMobileOpen(false); // Close menu on mobile after selection
  };

  return (
    <SectionContainer>
      <MobileMenuButton onClick={toggleMobileMenu}>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Menu />
        </IconButton>
        <Typography variant="h6" sx={{ ml: 1 }}>
          {selectedComponent.denomination}
        </Typography>
      </MobileMenuButton>

      <NavigationPanel mobileOpen={mobileOpen}>
        <Typography variant="h6" sx={{ p: 2, fontWeight: 'bold' }}>
          {section.denomination}
        </Typography>
        <Divider />
        <List component="nav">
          {section.items.map((item) => (
            <Box key={item.id}>
              <ItemButton
                isActive={item.id === selectedItem.id}
                onClick={() => handleItemClick(item.id)}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Typography sx={{ fontWeight: 'bold' }} gutterBottom>
                    {item.denomination}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <AccessTimeIcon sx={{ fontSize: '16px' }} />
                    <span>{item.duration} mins</span>
                  </Typography>
                </Box>
                {openItems[item.id] ? <ExpandLess /> : <ExpandMore />}
              </ItemButton>

              <Collapse in={openItems[item.id]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.components.map((component) => (
                    <ComponentButton
                      key={component.component_id}
                      isActive={component.component_id === selectedComponent.component_id}
                      onClick={() => handleComponentClick(item.id, component.component_id)}
                    >
                      <Typography variant="body2">{component.denomination}</Typography>
                    </ComponentButton>
                  ))}
                </List>
              </Collapse>
            </Box>
          ))}
        </List>
      </NavigationPanel>

      <ContentArea fullWidth={mobileOpen}>
        <Typography variant="h4" gutterBottom>
          {selectedComponent.denomination}
        </Typography>

        {selectedComponent.__typename === 'TextContent' && (
          <TextContent dangerouslySetInnerHTML={{ __html: selectedComponent.content }} />
        )}

        {selectedComponent.__typename === 'VideoContent' && selectedComponent.url && (
          <VideoComponent controls>
            <source
              src={getMediaUrl(selectedComponent.url)}
              type={`video/${selectedComponent.url.split('.').pop()}`}
            />
            Your browser does not support the video tag.
          </VideoComponent>
        )}
      </ContentArea>
    </SectionContainer>
  );
};

export default Section;
