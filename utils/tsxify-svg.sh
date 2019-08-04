#!/usr/bin/env bash

# Will create a tsx version of an svg file. Skips if dest exists.
#
# To run in batch, use
# `find src -name "*.svg" -exec ./utils/tsxify-svg.sh {} \;`
# or with dest dir
# # `find src -name "*.svg" -exec ./utils/tsxify-svg.sh {} src/components/icons \;`
#
# Note that $SED syntax is different on OSX, so install linux sed with homebrew first.
# Pull request welcome to convert this to javascript!
#

#set -x #echo on
set -e

if [ "$#" = 0 ]; then
  echo "You must specify a path to an svg file"
  exit
fi

SED=/usr/local/opt/gnu-sed/libexec/gnubin/sed
SRCPATH="$1"
SRCDIR="`dirname $SRCPATH`"
FILENAME="${SRCPATH##*/}"
FILENAME_NO_EXTENSION="${FILENAME%.*}"

if [ "$#" = 2 ]; then
  DESTDIR="$2"
else
  DESTDIR="$SRCDIR"
fi

# FNCNAME = basename in PascalCase
# ref: https://unix.stackexchange.com/questions/196239/convert-underscore-to-pascalcase-ie-uppercamelcase
FILENAME_PASCALCASE=`echo "$FILENAME_NO_EXTENSION" | $SED -r 's/(^|-|_)([a-z])/\U\2/g'`
FNCNAME=`echo $FILENAME_PASCALCASE`Icon
DESTPATH="$DESTDIR/$FILENAME_PASCALCASE.icon.tsx"

# Bail if dest exists
if [ -f "$DESTPATH" ]; then
    exit
fi


echo "import React from \"react\";
import Svg,{SvgProps, Circle, Ellipse, G, Text, TSpan, TextPath, Path, Polygon, Polyline, Line, Rect, Use, Image, Symbol, Defs, LinearGradient, RadialGradient, Stop, ClipPath, Pattern, Mask} from 'react-native-svg';

export const $FNCNAME = (svgProps: SvgProps) => (" > $DESTPATH
cat $1 >> $DESTPATH
echo ");
" >> $DESTPATH

# Change svg syntax to react syntax
$SED -i "s/<svg/<Svg/g" $DESTPATH
$SED -i "s/<\/svg>/<\/Svg>\n/g" $DESTPATH
$SED -i "s/<circle/<Circle/g" $DESTPATH
$SED -i "s/\/circle>/\/Circle>\n/g" $DESTPATH
$SED -i "s/<ellipse/<Ellipse/g" $DESTPATH
$SED -i "s/\/ellipse>/\/Ellipse>\n/g" $DESTPATH
$SED -i "s/<g/<G/g" $DESTPATH
$SED -i "s/\/g>/\/G>\n/g" $DESTPATH
$SED -i "s/<text/<Text/g" $DESTPATH
$SED -i "s/\/text>/\/Text>\n/g" $DESTPATH
$SED -i "s/<tSpan/<TSpan/g" $DESTPATH
$SED -i "s/\/tSpan>/\/TSpan>\n/g" $DESTPATH
$SED -i "s/<textPath/<TextPath/g" $DESTPATH
$SED -i "s/\/textPath>/\/TextPath>\n/g" $DESTPATH
$SED -i "s/<path/<Path/g" $DESTPATH
$SED -i "s/\/path>/\/Path>\n/g" $DESTPATH
$SED -i "s/<polygon/<Polygon/g" $DESTPATH
$SED -i "s/\/polygon>/\/Polygon>\n/g" $DESTPATH
$SED -i "s/<polyline/<Polyline/g" $DESTPATH
$SED -i "s/\/polyline>/\/Polyline>\n/g" $DESTPATH
$SED -i "s/<line/<Line/g" $DESTPATH
$SED -i "s/\/line>/\/Line>\n/g" $DESTPATH
$SED -i "s/<rect/<Rect/g" $DESTPATH
$SED -i "s/\/rect>/\/Rect>\n/g" $DESTPATH
$SED -i "s/<use/<Use/g" $DESTPATH
$SED -i "s/\/use>/\/Use>\n/g" $DESTPATH
$SED -i "s/<image/<Image/g" $DESTPATH
$SED -i "s/\/image>/\/Image>\n/g" $DESTPATH
$SED -i "s/<symbol/<Symbol/g" $DESTPATH
$SED -i "s/\/symbol>/\/Symbol>\n/g" $DESTPATH
$SED -i "s/<defs/<Defs/g" $DESTPATH
$SED -i "s/\/defs>/\/Defs>\n/g" $DESTPATH
$SED -i "s/<linearGradient/<LinearGradient/g" $DESTPATH
$SED -i "s/\/linearGradient>/\/LinearGradient>\n/g" $DESTPATH
$SED -i "s/<radialGradient/<RadialGradient/g" $DESTPATH
$SED -i "s/\/radialGradient>/\/RadialGradient>\n/g" $DESTPATH
$SED -i "s/<stop/<Stop/g" $DESTPATH
$SED -i "s/\/stop>/\/Stop>\n/g" $DESTPATH
$SED -i "s/<clipPath/<ClipPath/g" $DESTPATH
$SED -i "s/\/clipPath>/\/ClipPath>\n/g" $DESTPATH
$SED -i "s/<pattern/<Pattern/g" $DESTPATH
$SED -i "s/\/pattern>/\/Pattern>\n/g" $DESTPATH
$SED -i "s/<mask/<Mask/g" $DESTPATH
$SED -i "s/\/mask>/\/Mask>\n/g" $DESTPATH

# Prettify
$SED -i "s/\/>/\/>\n    /g" $DESTPATH
$SED -i "s/></>\n    </g" $DESTPATH

# Cleanup
$SED -i 's/xmlns="http:\/\/www.w3.org\/2000\/svg"//g' $DESTPATH

# Add props to Svg
$SED -i "s/ >/ {...svgProps} >/" $DESTPATH

# Fix fills to variable
# Turns out this is a bad idea. It's better to do it manually. Plus the regex is erroneous'

#$SED -i "s/fill=\".*\"/fill={svgProps.fill || 'gray'}/g" $DESTPATH

# Now remove unused imports and prettier
# Use a custom tslint.json to ensure that prettier isn't ran before remove unused imports.
npx tslint --fix -p tsconfig.json -c ./utils/tsxify-svg.tslint.json $DESTPATH
npx prettier --write $DESTPATH

echo "Created $DESTPATH."


